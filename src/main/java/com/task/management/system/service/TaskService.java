package com.task.management.system.service;

import com.task.management.system.Task;
import com.task.management.system.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task addTask(Task task) {
        // Business Logic: Only allow task creation on weekdays
        Calendar calendar = Calendar.getInstance();
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        if (dayOfWeek != Calendar.SATURDAY && dayOfWeek != Calendar.SUNDAY) {
            task.setCreationDate(new Date());
            return taskRepository.save(task);
        }
        return null;
    }

    public Task updateTask(Long id, Task updatedTask) {
        // Business Logic: Only update if task is 'pending'
        return taskRepository.findById(id)
                .filter(task -> "pending".equals(task.getStatus()))
                .map(task -> {
                    task.setTitle(updatedTask.getTitle());
                    task.setDescription(updatedTask.getDescription());
                    task.setStatus(updatedTask.getStatus());
                    return taskRepository.save(task);
                }).orElse(null);
    }

    public void deleteTask(Long id) {
        taskRepository.findById(id).ifPresent(task -> {
            long diffInMillies = Math.abs(new Date().getTime() - task.getCreationDate().getTime());
            long diff = diffInMillies / (24 * 60 * 60 * 1000);
            if (diff > 5) {
                taskRepository.deleteById(id);
            }
        });
    }
}