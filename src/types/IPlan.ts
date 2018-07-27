interface IPlan {
    id: string;
    type: string;
    searchEntity: {
        id: string;
        key: string;
        projectName: string;
        planName: string;
        branchName: string;
        description: string;
        type: string;
    };
}
