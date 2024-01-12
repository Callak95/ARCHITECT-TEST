package com.task.management.system.repository;

import com.task.management.system.model.Task;
import jakarta.transaction.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(Status status);
    List<Task> findByTitleContaining(String title);
    List<Task> findByDescriptionContaining(String description);

}