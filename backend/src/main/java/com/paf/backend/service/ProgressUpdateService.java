package com.paf.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.paf.backend.document.ProgressUpdate;
import com.paf.backend.document.SkillSharing;
import com.paf.backend.dto.ProgressUpdateDto;
import com.paf.backend.repository.ProgressUpdateRepository;

@Service
public class ProgressUpdateService {

    @Autowired
    private ProgressUpdateRepository repository;

    // ✅ Create new progress update
    public ProgressUpdate createProgressUpdate(ProgressUpdateDto dto) {
        ProgressUpdate progress = new ProgressUpdate(
                dto.getUserId(),
                dto.getTitle(),
                dto.getCaption(),
                dto.getStatus() != null ? dto.getStatus() : "Draft",
                dto.getImgLink()
        );

        ProgressUpdate saved = repository.save(progress);
        System.out.println("Inserted Progress Update with ID: " + saved.getId());
        return saved;
    }

    public List<ProgressUpdate> getAllProgressUpdates() {
        return repository.findAll();
    }

    // ✅ Get all progress updates for a user
    public List<ProgressUpdate> getProgressUpdatesByUser(String userId) {
        return repository.findByUserId(userId);
    }

    // ✅ Get a single progress update by ID
    public Optional<ProgressUpdate> getProgressUpdate(String id) {
        return repository.findById(id);
    }

    // ✅ Update a progress update by ID
    public ResponseEntity<?> updateProgressUpdate(String id, ProgressUpdateDto dto) {
        Optional<ProgressUpdate> existingUpdate = repository.findById(id);

        if (existingUpdate.isPresent()) {
            ProgressUpdate updateProgress = existingUpdate.get();

            if (dto.getTitle() != null) updateProgress.setTitle(dto.getTitle());
            if (dto.getCaption() != null) updateProgress.setCaption(dto.getCaption());
            if (dto.getImgLink() != null) updateProgress.setImgLink(dto.getImgLink());
            if (dto.getStatus() != null) updateProgress.setStatus(dto.getStatus());

            return new ResponseEntity<>(repository.save(updateProgress), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Progress Update Error: Not Found", HttpStatus.NOT_FOUND);
        }
    }

    // ✅ Delete a progress update
    public boolean deleteProgressUpdate(String id) {
        Optional<ProgressUpdate> optional = repository.findById(id);
        if (optional.isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
