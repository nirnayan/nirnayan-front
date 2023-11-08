export interface cartReq {
    schemaName: string;
    user_id: number;
    patient_id: number;
    prod_type: string;
    prod_id: number
}

export interface cartRes {
    id: number;
    created_at: string;
    patient_id: number;
    prod_id: number;
    prod_type: string;
    product_details: [];
    updated_at: string;
    user_id: number

}