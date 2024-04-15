package com.charitydonation.charityfund.repository;

import com.charitydonation.charityfund.model.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
}
