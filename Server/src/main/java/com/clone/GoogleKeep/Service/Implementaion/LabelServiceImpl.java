package com.clone.GoogleKeep.Service.Implementaion;

import com.clone.GoogleKeep.Exceptions.LabelNotFoundException;
import com.clone.GoogleKeep.Model.Label;
import com.clone.GoogleKeep.Model.Note;
import com.clone.GoogleKeep.Model.User;
import com.clone.GoogleKeep.Repository.LabelRepository;
import com.clone.GoogleKeep.Service.LabelService;
import com.clone.GoogleKeep.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class LabelServiceImpl implements LabelService {

    private final LabelRepository labelRepository;
    private final UserService userService;

    @Autowired
    public LabelServiceImpl(LabelRepository labelRepository, UserService userService) {
        this.labelRepository = labelRepository;
        this.userService = userService;
    }

    @Override
    public Label addLabel(int userId, String name) {

        User user = userService.getUserById(userId);
        Optional<Label> labelOptional = labelRepository.findByName(name);

        if (labelOptional.isPresent()) return labelOptional.get();

        Label label = new Label();
        label.setName(name);
        label.setUser(user);

        return labelRepository.save(label);
    }

    @Override
    public Label getLabelById(int userId, int labelId) {
        return validateUserAndLabel(userId,labelId);
    }

    @Override
    public List<Label> getAllLabels(int userId) {

        User user = userService.getUserById(userId);
        return user.getLabelList();
    }

    @Override
    public void deleteLabel(int userId, int labelId) {

        Label label = validateUserAndLabel(userId,labelId);
        List<Note> notes  = new ArrayList<>(label.getNoteSet());

        for(Note note : notes)  note.removeLabel(label);

        labelRepository.delete(label);

    }

    @Override
    public Label updateLabel(int userId, int labelId, String labelName) {

        Label label = validateUserAndLabel(userId,labelId);
        label.setName(labelName);
        return labelRepository.save(label);
    }


    private Label validateUserAndLabel(int userId, int labelId){

        User user = userService.getUserById(userId);
        if(!SecurityContextHolder.getContext().getAuthentication().getName().equals(user.getEmail()))
            throw new AccessDeniedException("Access Denied");
        return labelRepository.findByIdAndUser(labelId,user).
                orElseThrow(() -> new LabelNotFoundException("Label does not exists"));
    }
}
