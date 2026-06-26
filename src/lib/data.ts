export const settings = {
    isSplash: false,
};

const resumeDriveFileId = "1X9z_Z9Z_Z9z_Z9z"; // Update with actual Drive file ID

export const resumeLinks = {
    route: "/resume",
    view: `https://drive.google.com/file/d/${resumeDriveFileId}/view?usp=sharing`,
    preview: `https://drive.google.com/file/d/${resumeDriveFileId}/preview`,
    download: `https://drive.google.com/uc?export=download&id=${resumeDriveFileId}`,
};

export const seo = {
    title: "Shreyan Nalwad",
    description: "MS Computational Biology @ CMU · Zhao Biophotonics Lab · Clinical AI, Generative Models, Graph ML, Spatial Biology.",
    og: {
        title: "Shreyan Nalwad",
        type: "website",
        url: "https://shreyan.dev",
    },
};

export const greeting = {
    title: "Shreyan Balaji Nalwad",
    logo_name: "Shreyan",
    nickname: "shreyan",
    subTitle: "Computational Biology + AI Systems Engineer",
    resumeLink: resumeLinks.view,
    portfolio_repository: "https://github.com/Shreyan-A0I/portfolio",
    githubProfile: "https://github.com/Shreyan-A0I",
};

export const socialMediaLinks = [
    {
        name: "Github",
        link: "https://github.com/Shreyan-A0I",
    },
    {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/shreyan-nalwad",
    },
    {
        name: "Gmail",
        link: "mailto:shreyan.nalwad@gmail.com",
    },
];

export const contactPageData = {
    contactSection: {
        title: "Let's Build Something",
        description: "Interested in discussing computational biology, AI systems, or edge inference? Reach out.",
    },
};
