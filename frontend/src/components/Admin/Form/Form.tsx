import React, { useState, useRef, useEffect, useContext } from 'react';
import { Button, Typography, Form as AntdForm } from 'antd';
import { FormItems } from './FormItems';
import { FormProps, FormDataProps, FormTypeProps, FrmProps } from './types';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';
import { UserContext } from '../../../hooks/auth';

export const FormContext = React.createContext({
    setImageIsUploading: (value: boolean) => { },
    setImageUrlList: (value: string[]) => { },
    imageUrlList: [] as string[],
    imgIsUploading: false,
});
export const Form = <T,>({ ...props }: FormProps<T>) => {
    const { user } = useContext(UserContext);
    const {
        headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${user?.token}`,
        },
        title = '',
        // isNew = false,
        rules = {},
        formData = {},
        formType = [],
        api = '',
        // callbackUrl = null,
        hasUpdate = false,
        hasPreview = false,
        hasDelete = false,
        hasBack = false,

        submitButtonTitle = 'Submit',
        updateButtonTitle = 'Update',
        deleteButtonTitle = 'Delete',
    } = props;

    const { fetchData, response, isLoading, error } = useAxios<T>()
    const [imgIsUploading, setImageIsUploading] = useState(false);
    const [imageUrlList, setImageUrlList] = useState<string[]>([]);

    const navigate = useNavigate();
    // default the props
    const initForm = (formType: FormTypeProps[], formData: FormDataProps) => {
        // 如果有form data, 將form data 塞入form
        const frm: FrmProps = {};
        if (formData.id) {
            frm.id = formData.id;
        }
        formType.forEach((h) => {
            frm[h.key] = formData[h.key];
        });
        console.log(frm)
        return frm;
    }

    const [form, setForm] = useState(() => initForm(formType, formData));
    const frmRef = useRef(null);

    const handleSubmit = async () => {
        console.log(form)
        if (form.id && form.id > 0) {
            await fetchData('PUT', api, form, headers)
        } else {
            await fetchData('POST', api, form, headers)
        }
        console.log(response)
    }

    useEffect(() => {
        if (response) {
            navigate(-1)
        } else if (error) {
            console.log(error)
        }
    }, [response, error, navigate])

    return (
        <FormContext.Provider value={{
            setImageIsUploading: setImageIsUploading,
            setImageUrlList: setImageUrlList,
            imageUrlList: imageUrlList,
            imgIsUploading: imgIsUploading,
        }}>
            <AntdForm
                labelCol={{
                    xs: { span: 24 },
                    sm: { span: 6 },
                }}
                wrapperCol={{
                    xs: { span: 14 },
                    sm: { span: 8 },
                }}
                labelWrap
                ref={frmRef}
                onFinish={handleSubmit}
            >
                {title && <Typography.Title>{title}</Typography.Title>}
                {formType.map((frm) => (
                    <FormItems
                        key={frm.key}
                        role={rules[frm.key]}
                        frm={frm}
                        form={form}
                        setFormData={setForm}
                    />
                ))}
                <br />

                {
                    hasBack && (<Button onClick={() => navigate(-1)}>Back</Button>)
                }
                {
                    hasDelete && form['id'] && (
                        <Button> {deleteButtonTitle} </Button>
                    )
                }
                {
                    hasUpdate && (
                        <AntdForm.Item wrapperCol={{
                            xs: { span: 24 },
                            sm: { offset: 6,span: 8 },
                        }}>
                            <Button loading={isLoading} htmlType="submit">
                                {form.id ? updateButtonTitle : submitButtonTitle}
                            </Button>
                        </AntdForm.Item>
                    )
                }
                {
                    hasPreview && (
                        <AntdForm.Item>
                            <Button> Preview </Button>
                        </AntdForm.Item>
                    )
                }
            </AntdForm>
        </FormContext.Provider>
    );
};
