import ImgCrop from 'antd-img-crop';
import { Button, message, Form, Input, InputNumber, Switch, Select, Row, Typography, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { createContext, useState } from "react";
import { FormDataProps, FormItemsProps, FormValueProps } from "./types";
import { IMAGE_UPLOADER } from '../../../api/config';
import Editor from './Editor';
import TextArea from 'antd/es/input/TextArea';


export const FormItemsContext = createContext<FormDataProps>({
    setImageIsUploading: (value: boolean) => { },
    setImageUrlList: (value: string[]) => { },
    imageUrlList: [] as string[],
    imgIsUploading: false,
    setFormData: (value: FormDataProps) => { },
    form: {},
    frm: {},
    role: {},
});


export const FormItems = ({
    form,
    frm,
    role,
    setFormData,

}: FormItemsProps) => {
    // Password
    const [passwordShow, setPasswordShow] = useState<boolean>(false)
    const handleShowPassword = () => setPasswordShow(!passwordShow)
    const initImage = () => {
        if (form[frm.key] && frm.type === 'image') {
            const defaultFile: UploadFile =
            {
                uid: '-1',
                name: 'default',
                thumbUrl: form[frm.key],
            }
            return [defaultFile]
        } else
            return []
    }

    const [fileList, setFileList] = useState<UploadFile[]>(
        initImage());
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList, file: _file }) => {
        setFileList(newFileList);
        // set to form
        setFormData((prev: FormDataProps) => {
            return {
                ...prev,
                [frm.key]: _file.response
            }
        }
        )
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };


    const renderFormItem = () => {
        switch (frm.type) {
            case 'checkbox':
                return (
                    <>TODO</>
                )
            case 'password':
                return (
                    <Input.Group>
                        <Input
                            placeholder={frm.placeholder}
                            value={form[frm.key]}
                            onChange={(e) => {
                                setFormData((prev: FormDataProps) => ({ ...prev, [frm.key]: e.target.value }));
                            }}
                            type={passwordShow ? 'text' : 'password'}
                        />
                        <Input width='4.5rem'>
                            <Button onClick={handleShowPassword}>
                                {passwordShow ? 'Hide' : 'Show'}
                            </Button>
                        </Input>
                    </Input.Group>
                )
            case 'image':
                return (
                    <>
                        <ImgCrop 
                        // rotationSlider
                        // aspectSlider
                        showReset
                        aspect={4/3}
                        >
                            <Upload
                                beforeUpload={beforeUpload}
                                maxCount={1}
                                action={IMAGE_UPLOADER}
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                            >
                                {fileList.length < 1 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
                    </>
                )
            case 'switch':
                return (
                    <Switch checked={form[frm.key]}
                        onChange={(value) => { setFormData((prev: FormDataProps) => ({ ...prev, [frm.key]: value })); }
                        } />
                );
            case 'text':
                return (
                    <Input
                        placeholder={frm.placeholder}
                        value={form[frm.key]}
                        onChange={(e) => {
                            setFormData((prev: FormDataProps) => ({ ...prev, [frm.key]: e.target.value }));
                        }}
                    />
                );
            case 'textarea':
                return (
                    <TextArea
                        placeholder={frm.placeholder}
                        value={form[frm.key]}
                        defaultValue={form[frm.key]}
                        onChange={(e) => {
                            setFormData((prev: FormDataProps) => ({ ...prev, [frm.key]: e.target.value }));
                        }}
                    />
                );
            case 'number':
                return (
                    <Row>
                        <Typography.Title>{frm.label}</Typography.Title>
                        <InputNumber
                            placeholder={frm.placeholder}
                            value={form[frm.key]}
                            onChange={
                                (value) => {
                                    setFormData((prev: FormDataProps) => ({ ...prev, [frm.key]: value }));
                                }
                            }
                            min={frm.min} />
                    </Row>
                );
            case 'editor':
                return (
                    <div>
                        <Editor
                            setContent={(data) => {
                                setFormData((prev: FormDataProps) => ({ ...prev, [frm.key]: data }));
                            }}
                            defaultData={form[frm.key]}
                            data={form[frm.key]}
                        />
                    </div>
                )
            case 'options':
                return (
                    <Select
                        defaultValue={frm.defaultValue && frm.defaultValue}
                        placeholder={frm.placeholder}
                        value={form[frm.key]}
                        onChange={(e) => {
                            setFormData((prev: FormDataProps) => ({ ...prev, [frm.key]: e }));
                        }}
                    >
                        {frm.values?.map((item: FormValueProps) => {
                            return (
                                <Select.Option key={item.text} value={item.value} label={item.text}>{item.text}</Select.Option>)
                        }
                        )}

                    </Select>
                )
        }
    }
    return (
        <FormItemsContext.Provider value={{
            // setImageIsUploading: setImageIsUploading,
            // setImageUrlList: setImageUrlList,
            // imageUrlList: imageUrlList,
            // imgIsUploading: imgIsUploading,
            form: form,
            frm: frm,
            role: role,
            setFormData: setFormData,
        }}>
            <Form.Item
                label={frm.label}
                style={{ justifyContent: 'end' }}
            >
                {renderFormItem()}
            </Form.Item>
        </FormItemsContext.Provider>
    )
}
