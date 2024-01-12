package com.task.management.system.service;

import com.task.management.system.model.Task;
import com.task.management.system.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public Task findById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid task Id:" + id));
    }

    public void update(Task task) {
        taskRepository.save(task);
    }

    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }

    public List<Task> findByStatus(Task.Status status) {
        return taskRepository.findByStatus(status);
    }

    public List<Task> findByTitleContaining(String title) {
        return taskRepository.findByTitleContaining(title);
    }

    public List<Task> findByDescriptionContaining(String description) {
        return taskRepository.findByDescriptionContaining(description);
    }

}