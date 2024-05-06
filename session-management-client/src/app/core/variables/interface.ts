export interface ILoginResponse {
    message: string;
    status: boolean;
    role: number;
}

export interface IMaster {
    id: number;
    name: string;
}

export interface IGetResponse {
    message: string;
    status: boolean;
    departmentDetails: Array<IMaster>;
    designationDetails: Array<IMaster>;
    teamLeadsDetails: Array<IMaster>;
}

export interface ISessionDetails {
    id: number;
    topic: string;
    takingHrs: number;
    date: string | Date;
    approvalStatus: string;
    teamLeadName: string;
    departmentName: string;
    fromTime: string | Date | null;
    toTime: string | Date | null;
    requestedDate: string;
    approvalId: number;
    name: string;
}

export interface IGetDetailsResponse {
    message: string;
    status: boolean;
    data: Array<ISessionDetails>;
}

export interface ISaveResponse {
    message: string;
    status: boolean;
}