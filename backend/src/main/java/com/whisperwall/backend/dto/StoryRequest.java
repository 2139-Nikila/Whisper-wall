package com.whisperwall.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoryRequest {
    @NotBlank
@Size(min = 5, max = 100)
private String title;

@NotBlank
@Size(min = 10)
private String content;
}