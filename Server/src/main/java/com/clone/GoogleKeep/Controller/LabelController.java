package com.clone.GoogleKeep.Controller;

import com.clone.GoogleKeep.Exceptions.ApiResponse;
import com.clone.GoogleKeep.Model.Label;
import com.clone.GoogleKeep.Service.LabelService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/{userId}/label")
public class LabelController {


    private final LabelService labelService;

    @Autowired
    public LabelController(LabelService labelService) {
        this.labelService = labelService;
    }

    @PostMapping("/")
    public ResponseEntity<Label> addLabel(@PathVariable("userId") int userId,
                                          @NotBlank(message = "Label name must not be null or empty")
                                          @RequestParam("labelName") String labelName){
        Label label = labelService.addLabel(userId,labelName);
        return new ResponseEntity<>(label, HttpStatus.CREATED);
    }

    @GetMapping("/{labelId}")
    public ResponseEntity<Label> getLabelById(@PathVariable("userId") int userId,
                                              @PathVariable("labelId") int labelId){
        Label label = labelService.getLabelById(userId,labelId);
        return new ResponseEntity<>(label, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<Label>> getAllLabels(@PathVariable("userId") int userId){
        List<Label> labels = labelService.getAllLabels(userId);
        return new ResponseEntity<>(labels,HttpStatus.OK);
    }

    @DeleteMapping("/{labelId}")
    public ResponseEntity<ApiResponse> deleteLabel(@PathVariable("userId") int userId,
                                                   @PathVariable("labelId") int labelId){
        labelService.deleteLabel(userId,labelId);
        return new ResponseEntity<>(new ApiResponse(HttpStatus.OK,
                "Label deleted Successfully"),HttpStatus.OK);
    }

    @PutMapping("/{labelId}")
    public ResponseEntity<Label> updateLabel(@PathVariable("userId") int userId,@PathVariable("labelId") int labelId,
                                             @NotBlank(message = "Label name must not be null or empty")
                                             @RequestParam("labelName") String labelName){

        Label label = labelService.updateLabel(userId,labelId,labelName);
        return new ResponseEntity<>(label,HttpStatus.OK);
    }

}












