import { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

// lib
import { checkForAndCreateDir, saveFile } from '../../lib/file-management';
import { appConfig } from '../../lib/config';

// hooks
import useSnippets from '../../hooks/context/useSnippets';

// components
import Form from '../../components/base/Form';
import Input from '../../components/base/Input';
import CodeEditor from '../../components/CodeEditor';
import Layout from '../../components/global/Layout';
import ActionBar from '../../components/global/ActionBar';
import Button from '../../components/base/Button';
import TextArea from '../../components/base/TextArea';

type Form = {
  title: string;
  description: string;
  tags: string[];
  fileName: string;
  fileValue: string;
};

const SnippetsAdd: NextPage = () => {
  const { loadSnippets } = useSnippets();
  const form = useForm<Form>({
    defaultValues: {
      title: '',
      description: '',
      tags: [],
      fileName: '',
      fileValue: '',
    },
  });

  const handleCodeEditorChange = (fileValue: string) => {
    form.setValue('fileValue', fileValue);
  };

  const handleFileNameChange = (fileName: string) => {
    form.setValue('fileName', fileName);
  };

  const handleSubmit: SubmitHandler<Form> = async (data) => {
    try {
      await checkForAndCreateDir(appConfig.DEFAULT_SNIPPETS_FOLDER);
      await saveFile(`${data.title}/${data.fileName}`, data.fileValue, appConfig.DEFAULT_SNIPPETS_FOLDER);
      await saveFile(`${data.title}/cs-description.md`, data.description, appConfig.DEFAULT_SNIPPETS_FOLDER);
      toast.success('File saved successfully');
      loadSnippets();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save file');
    }
  };

  return (
    <Layout>
      <Form form={form} onSubmit={handleSubmit} className='flex flex-col gap-8 h-full'>
        <div className='px-8 flex flex-col gap-4 max-w-[500px]'>
          <Input label='Title' name='title' type='text' />
          <TextArea label='Description' name='description' />
        </div>
        <CodeEditor onCodeChange={handleCodeEditorChange} onFileNameChange={handleFileNameChange} />

        <ActionBar>
          <Button href='/snippets'>Cancel</Button>
          <Button type='submit' color='primary'>
            Save
          </Button>
        </ActionBar>
      </Form>
    </Layout>
  );
};

export default SnippetsAdd;
function loadSettings() {
  throw new Error('Function not implemented.');
}
