import { AxiosRequestConfig } from "axios";


export type RoleProps = {
    // [key: string]: any;
    required: boolean;
    message: string;
}

export type FrmProps = {
    [key: string]: any;
}

export type FormDataProps = {
    [key: string]: any;
}


export type FormValueProps = {
    text: string;
    value: number;
}

export type ImageUploadProps = {
    isRequired: boolean | undefined;
    maxCount: number;
}

export type FormItemsProps = {
    form: any;
    role?: RoleProps;
    frm: FrmProps;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export type FormTypeProps = {
    type: 'switch' | 'text' | 'number' | 'password' | 'editor' | 'date' | 'image' | 'singleImage' |'options' | 'textarea';
    label?: string;
    key: string;
    placeholder?: string;
    prop?: any;
    values?: FormValueProps[];
    defaultValue?: any;
}

export interface FormProps<T> {
    headers?: AxiosRequestConfig['headers']
    title?: string;
    isNew?: boolean;
    rules?: any;
    formData?: FormDataProps;
    formType?: FormTypeProps[];
    subUrl?: string;
    api?: string;
    callbackUrl?: string;
    hasBack?: boolean;
    hasSubmit?: boolean;
    hasUpdate?: boolean;
    hasPreview?: boolean;
    hasDelete?: boolean;
    hasToast?: boolean;
    totastTitle?: string;
    totastDescription?: string;
    submitButtonTitle?: string,
    updateButtonTitle?: string,
    deleteButtonTitle?: string,
}