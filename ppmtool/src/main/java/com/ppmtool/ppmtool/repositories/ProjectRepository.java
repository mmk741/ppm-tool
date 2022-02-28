package com.ppmtool.ppmtool.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ppmtool.ppmtool.domain.Project;



@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

   
	Project findByProjectIdentifier(String proectId);
	
	Iterable<Project>findAllByProjectLeader(String username);


	
	
}
