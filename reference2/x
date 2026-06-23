Dear Dr. Xie Shiyu,

I wanted to provide a brief update on the code development for building the projection data vector b and the system matrix A.

I have written code to construct b by iterating through the DICOM files, applying the rescaling using RescaleSlope and RescaleIntercept to obtain the line integrals, reshaping the 2D projection matrix into a vector, and concatenating the vectorized projection data. Interestingly, I noticed that the provided projection data has already undergone logarithm transformation during preprocessing, so the log(bi/yi - ri) step may not be needed, therefore I'd wish to hear your thoughts on this paragraph on the Grand Challenge's website:"""Noise Insertion to Simulate Reduced Dose Levels

Poisson noise was inserted into the projection data for each case in the library to reach a noise level that corresponded to 25% of the full dose (i.e. "quarter-dose" data were simulated). The projection data were from right before image reconstruction, i.e. after all preprocessing and taking the logarithm. For reconstruction algorithms requiring statistical information, a noise map, expressed as the noise-equivalent incident number of quanta for each data frame, was provided."""

Regarding the system matrix A, I plan to use a fan-beam/cone-beam geometry based on the documentation.

One notable observation is the unusually large number of DICOM files (around 37,000) for a single patient scan. I will investigate the appropriate way to handle this volume of data and potentially process the files in batches.

I will continue working on setting up A and integrating it with b. Please let me know if you have any specific instructions or feedback.Thank you for your guidance.

Best regards,Sai Ravi Teja G