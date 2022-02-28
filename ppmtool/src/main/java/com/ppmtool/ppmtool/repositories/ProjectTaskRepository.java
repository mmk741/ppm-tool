package com.ppmtool.ppmtool.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ppmtool.ppmtool.domain.ProjectTask;

@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {

	
	List<ProjectTask> findByProjectIdentiferOrderByPriority(String id);
	
	ProjectTask findByProjectSequence(String sequence);
	
}
