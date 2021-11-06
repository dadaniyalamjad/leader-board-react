export interface TableColumn {
    id: 'SNo' | 'participantName' | 'location' | 'date' | 'units' | 'type' | 'points' | 'action',
    label: string,
    minWidth?: number,
    maxWidth?: number,
    width?: number,
    align?: 'right',
    format?: (value: number) => string,
}

export interface TableRecord {
    record?: any,
    pageNumber?: any,
    rowPerPageNumber?: any,
    count?: any,
    id?: string,
    key?: string,
    toggle?: any,
    remove?: any,
    modal?: any,
    errorMessage?: string
}

export interface TableData {
    id: string,
    SNo: number,
    participantName: string,
    location: string,
    date: any,
    units: string,
    type: string,
    points: any,
    action: any
}

export interface UserAdd {
    name: string,
    country: string,
    joinDate: string,
    units: number,
    point: number,
    actionType: string,
}