package com.paf.backend.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paf.backend.document.ProgressUpdate;
import com.paf.backend.dto.ProgressUpdateDto;
import com.paf.backend.service.ProgressUpdateService;

@RestController
@RequestMapping("/api/progressupdates")
@CrossOrigin(origins = "*")
public class ProgressUpdateController {
    
    @Autowired
    private ProgressUpdateService service;

    @PostMapping
    public ProgressUpdate createProgressUpdate (@RequestBody ProgressUpdateDto dto) {
        return service.createProgressUpdate(dto);
    }

    @GetMapping("/user/{userId}")
    public List<ProgressUpdate> getProgressUpdatesByUser(@PathVariable String userId) {
        return service.getProgressUpdatesByUser(userId);
    }

    @GetMapping("/{id}")
    public ProgressUpdate getProgressUpdate(@PathVariable String id){
        return service.getProgressUpdate(id).orElse(null);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProgressUpdate(@PathVariable String id, @RequestBody ProgressUpdateDto dto) {
        return service.updateProgressUpdate(id, dto);
    }
    
    

    
    @DeleteMapping("/{id}")
    public String deleteProgressUpdate(@PathVariable String id) {
    boolean deleted = service.deleteProgressUpdate(id);
    if (deleted) {
        return "Progress update deleted successfully.";
    } else {
        return "Progress update not found.";
    }
}


}
