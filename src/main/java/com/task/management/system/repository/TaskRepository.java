package com.task.management.system.repository;

import com.task.management.system.model.Task;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;


@EnableJpaRepositories(basePackages = {"com.task.management.system.repository"})
@SpringBootApplication
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(Task.TaskStatus status);
    List<Task> findByTitleContaining(String title);
    List<Task> findByDescriptionContaining(String description);

}