package com.paf.backend.controller;

import com.paf.backend.document.Notification;
import com.paf.backend.dto.NotificationDto;
import com.paf.backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    //Create a new notification
    @PostMapping
    public Notification createNotification(@RequestBody NotificationDto dto) {
        return notificationService.createNotification(dto);
    }


    //Get all notifications for a user
    @GetMapping("/{userId}")
    public List<Notification> getNotifications(@PathVariable String userId) {
        return notificationService.getNotificationsForUser(userId);
    }

    //Mark a specific notification as read
    @PatchMapping("/{id}/read")
    public Notification markAsRead(@PathVariable String id) {
        return notificationService.markAsRead(id);
    }

    // Delete a specific notification by ID
    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable String id) {
        notificationService.deleteNotification(id);
    }

    // Clear all notifications for a user
    @DeleteMapping("/user/{userId}/clear")
    public void clearAllNotifications(@PathVariable String userId) {
        notificationService.clearAllNotifications(userId);
    }
}
