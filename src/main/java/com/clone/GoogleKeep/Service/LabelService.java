package com.clone.GoogleKeep.Service;

import com.clone.GoogleKeep.Model.Label;

import java.util.List;

public interface LabelService {

    public Label addLabel(int userId, String name);

    public Label getLabelById(int userId, int labelId);

    public List<Label> getAllLabels(int userId);

    public void deleteLabel(int userId, int labelId);

    public Label updateLabel(int userId, int labelId, String labelName);
}
