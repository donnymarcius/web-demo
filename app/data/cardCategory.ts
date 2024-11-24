export type CategoryProps = {
    src: string;
    alt: string;
    title: string;
    description: string;
};
  
export const CategoryData: CategoryProps[] = [
    {
        src: "/images/icon/school-green.png",
        alt: "school",
        title: "Academia",
        description:
        "The mentor works within the academic field (Example: researchers, lecturers, etc.)",
    },
    {
        src: "/images/icon/company-green.png",
        alt: "company",
        title: "Company",
        description: "The mentor works within a life science-related company.",
    },
    {
        src: "/images/icon/startup-green.png",
        alt: "start-up",
        title: "Start-Up",
        description:
        "The mentor works within a life science-related start-up.",
    },
    {
        src: "/images/icon/bank-green.png",
        alt: "government",
        title: "Government",
        description:
        "The mentor works for a government agency or body (Example: Badan Riset dan Inovasi Nasional or BRIN).",
    },
    {
        src: "/images/icon/school-green.png",
        alt: "student abroad",
        title: "Indonesian Student Abroad",
        description:
        "The mentor is an Indonesian student majoring in life sciences who is currently or has ever studied abroad.",
    },
  ];