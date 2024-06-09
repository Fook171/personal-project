package com.charitydonation.charityfund.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "FundraisingCampaign")
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "campaignNameVN")
    private String nameVN;

    @Column(name = "campaignNameEN")
    private String nameEN;

    @Column(name = "campaignPoster")
    private String poster;

    @Column(name = "descriptionVN", columnDefinition="TEXT")
    private String descriptionVN;

    @Column(name = "descriptionEN", columnDefinition="TEXT")
    private String descriptionEN;

    @Column(name = "creator")
    private String creator;

    @Column(name = "startingDate")
    private LocalDateTime startingDate;

    @Column(name = "endingDate")
    private LocalDateTime endingDate;

    @Column(name = "addingDate")
    private LocalDateTime addingDate;

    @Column(name = "targetFund")
    private BigDecimal targetAmount;

    @Column(name = "currentFund")
    private BigDecimal currentAmount;
}
