package com.whisperwall.backend.dto;

import com.whisperwall.backend.model.VoteType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteRequest {

    private VoteType voteType;

}