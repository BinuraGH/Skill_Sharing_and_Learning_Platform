package com.paf.backend.service;

import com.paf.backend.document.Notification;
import com.paf.backend.dto.NotificationDto;
import com.paf.backend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository repository;

    public Notification createNotification(NotificationDto dto) {
        Notification notification = new Notification();
        notification.setUserId(dto.getUserId());
        notification.setType(dto.getType());
        notification.setMessage(dto.getMessage());
        notification.setPostId(dto.getPostId());
        notification.setTimestamp(LocalDateTime.now().toString());
        return repository.save(notification);
    }

    public List<Notification> getNotificationsForUser(String userId) {
        return repository.findByUserIdOrderByTimestampDesc(userId);
    }

    public Notification markAsRead(String id) {
        Notification notification = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        return repository.save(notification);
    }

    public void deleteNotification(String id) {
        repository.deleteById(id);
    }

    public void clearAllNotifications(String userId) {
        List<Notification> notifications = getNotificationsForUser(userId);
        repository.deleteAll(notifications);
    }
}
