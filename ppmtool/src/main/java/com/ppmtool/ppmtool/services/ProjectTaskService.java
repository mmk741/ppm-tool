package com.ppmtool.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ppmtool.ppmtool.domain.Backlog;
import com.ppmtool.ppmtool.domain.Project;
import com.ppmtool.ppmtool.domain.ProjectTask;
import com.ppmtool.ppmtool.exceptions.ProjectNotFoundException;
import com.ppmtool.ppmtool.repositories.BacklogRepository;
import com.ppmtool.ppmtool.repositories.ProjectRepository;
import com.ppmtool.ppmtool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
    private ProjectRepository projectRepository;	
	
	@Autowired
	private ProjectService projectService;
	
	
	
	public ProjectTask addProjectTask(String projectIdentifier , ProjectTask projectTask , String username)
	{
		
		
		
		 //Exceptions: Project not found

		try {

			 Backlog backlog =  projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
	       
			 //set the backlog to pt
	            projectTask.setBacklog(backlog);
	            //we want our project sequence to be like this: IDPRO-1  IDPRO-2  ...100 101
	            Integer BacklogSequence = backlog.getPTSequence();
	            // Update the BL SEQUENCE
	            BacklogSequence++;

	            backlog.setPTSequence(BacklogSequence);

	            //Add Sequence to Project Task
	            projectTask.setProjectSequence(backlog.getProjectIdentifier()+"-"+BacklogSequence);
	            projectTask.setProjectIdentifer(projectIdentifier);

	            //INITIAL priority when priority null

	            //INITIAL status when status is null
	            if(projectTask.getStatus()==""|| projectTask.getStatus()==null){
	                projectTask.setStatus("TO_DO");
	            }

	            if(projectTask.getPriority()==null || projectTask.getPriority()==0 ){ 
	                projectTask.setPriority(3);
	            }

	            return projectTaskRepository.save(projectTask);
	        }catch (Exception e){
	            throw new ProjectNotFoundException("Project not Found");
	        }
		
		
	}
	
	public Iterable<ProjectTask>findBacklogById(String id , String username) {
		
		projectService.findProjectByIdentifier(id, username);
		
//		if(project==null)
//			 throw new ProjectNotFoundException("Project with Id "+ id +" does not exist");
		
		
		return projectTaskRepository.findByProjectIdentiferOrderByPriority(id);
	}
	
	public ProjectTask findPTByProjectSequence(String backlog_id,String pt_id,String username)
	{
		 //make sure we are searching on an existing backlog
//        Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
//        if(backlog==null){
//            throw new ProjectNotFoundException("Project with ID: '"+backlog_id+"' does not exist");
//        }
		
		projectService.findProjectByIdentifier(backlog_id, username);

        //make sure that our task exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);

        if(projectTask == null){
            throw new ProjectNotFoundException("Project Task '"+pt_id+"' not found");
        }

        //make sure that the backlog/project id in the path corresponds to the right project
        if(!projectTask.getProjectIdentifer().equals(backlog_id)){
            throw new ProjectNotFoundException("Project Task '"+pt_id+"' does not exist in project: '"+backlog_id);
        }


        return projectTask;
	}
	
	public ProjectTask updateByProjectSequence(ProjectTask updatedTask,String backlog_id,String pt_id,String username)
	{
		ProjectTask projectTask=findPTByProjectSequence(backlog_id,pt_id,username);
		
		projectTask=updatedTask;
		return projectTaskRepository.save(updatedTask);
	}
	
	
	public void deletePTByProjectSequence(String backlog_id,String pt_id ,String username)
	{
		ProjectTask projectTask=findPTByProjectSequence(backlog_id,pt_id,username);
		
		projectTaskRepository.delete(projectTask);
	}
	
	
	
}
