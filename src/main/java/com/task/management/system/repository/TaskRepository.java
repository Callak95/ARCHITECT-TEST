package com.task.management.system.repository;

import com.task.management.system.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(Task.TaskStatus status);
    List<Task> findByTitleContaining(String title);
    List<Task> findByDescriptionContaining(String description);
}