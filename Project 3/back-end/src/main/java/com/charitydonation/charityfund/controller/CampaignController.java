package com.charitydonation.charityfund.controller;

import com.charitydonation.charityfund.model.Campaign;
import com.charitydonation.charityfund.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@RestController
public class CampaignController {
    @Autowired
    private CampaignRepository campaignRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value="/addCampaign")
    public void get(@RequestBody Campaign data) {
        campaignRepository.save(data);
        System.out.println("Save successfully");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value="/posterUpload")
    public void getImage(@RequestParam("file") MultipartFile file, @RequestParam("name") String fileName) {
        if (!file.isEmpty()) {
            try {
                String path = System.getProperty("user.dir") + "/src/main/resources/static/image/poster/" + fileName;

                File dest = new File(path);
                if (!dest.getParentFile().exists()) {
                    dest.getParentFile().mkdirs();
                }

                FileOutputStream fos = new FileOutputStream(dest);
                fos.write(file.getBytes());
                fos.close();

                System.out.println("File saved in: " + path);
                System.out.println(fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
