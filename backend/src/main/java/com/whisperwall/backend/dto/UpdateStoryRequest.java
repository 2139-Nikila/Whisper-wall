package com.whisperwall.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateStoryRequest {

    private String title;

    private String content;
}