package com.paf.backend.controller;

import com.paf.backend.document.SkillSharing;
import com.paf.backend.service.SkillShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/skill-sharing")
@CrossOrigin(origins = "*")
public class SkillSharingController {

    @Autowired
    private SkillShareService service;

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<?> create(
            @RequestParam("userId") String userId,
            @RequestParam("description") String description,
            @RequestParam(value = "media", required = false) List<MultipartFile> mediaFiles) {
        try {
            SkillSharing created = service.createSkillSharing(userId, description, mediaFiles);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<SkillSharing>> getAll() {
        return ResponseEntity.ok(service.getAllSkillSharings());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SkillSharing>> getByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(service.getSkillSharingsByUserId(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillSharing> update(@PathVariable String id, @RequestParam String description) {
        Optional<SkillSharing> updated = service.updateSkillSharing(id, description);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        boolean deleted = service.deleteSkillSharing(id);
        if (deleted) {
            String message = "SkillSharing with ID " + id + " deleted successfully.";
            return ResponseEntity.ok(message);
        } else {
            return ResponseEntity.status(404).body("SkillSharing with ID " + id + " not found.");
        }
    }

}
