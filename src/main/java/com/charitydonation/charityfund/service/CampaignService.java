package com.charitydonation.charityfund.service;

import com.charitydonation.charityfund.model.Campaign;
import com.charitydonation.charityfund.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class CampaignService {

        @Autowired
        private CampaignRepository campaignRepository;
        @GetMapping(value="/printCampaign")
        public void printAllCampaigns() {
            Iterable<Campaign> campaigns = campaignRepository.findAll();
            for (Campaign campaign : campaigns) {
                System.out.println(campaign.toString());
            }
        }


}
