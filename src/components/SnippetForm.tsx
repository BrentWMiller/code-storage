import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

// lib
import { checkForAndCreateDir, removeDir, saveFile } from '../lib/file-management';
import { appConfig } from '../lib/config';

// hooks
import useSnippets, { SnippetT } from '../hooks/context/useSnippets';

// components
import Form from '../components/base/Form';
import Input from '../components/base/Input';
import CodeEditor from '../components/CodeEditor';
import ActionBar from '../components/global/ActionBar';
import Button from '../components/base/Button';
import TextArea from '../components/base/TextArea';

type Props = {
  snippet?: SnippetT;
};

type Form = {
  title: string;
  description: string;
  tags: string;
  fileName: string;
  fileValue: string;
};

const SnippetsAdd = ({ snippet }: Props) => {
  const router = useRouter();
  const { loadSnippets, loadSnippet } = useSnippets();

  const form = useForm<Form>({
    defaultValues: {
      title: '',
      tags: '',
      description: '',
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
    // Generate title with tags after | symbol
    const titleWithTags = data.tags !== '' ? `${data.title} | ${data.tags}` : data.title;

    try {
      await checkForAndCreateDir(appConfig.DEFAULT_SNIPPETS_FOLDER);
      await saveFile(`${titleWithTags}/${data.fileName}`, data.fileValue, appConfig.DEFAULT_SNIPPETS_FOLDER);
      await saveFile(`${titleWithTags}/${appConfig.DEFAULT_README_FILENAME}`, data.description, appConfig.DEFAULT_SNIPPETS_FOLDER);
      await saveFile(`${titleWithTags}/${appConfig.DEFAULT_DATA_FILENAME}`, JSON.stringify(data), appConfig.DEFAULT_SNIPPETS_FOLDER);

      if (snippet) {
        // Remove old snippet folder if it exists
        await removeDir(snippet.path);
      }

      toast.success('File saved successfully');
      await loadSnippets();

      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save file');
    }
  };

  useEffect(() => {
    if (snippet) {
      form.setValue('title', snippet.name);
      form.setValue('tags', snippet.tags?.join(', ') || '');
      form.setValue('description', snippet.description);
      form.setValue('fileName', snippet.files?.[0]?.name || '');
      form.setValue('fileValue', snippet.files?.[0]?.value || '');
    }
  }, [snippet]);

  return (
    <Form form={form} onSubmit={handleSubmit} className='flex h-full flex-col gap-8'>
      <div className='flex max-w-[500px] flex-col gap-4 px-8'>
        <Input label='Title' name='title' type='text' />
        <Input label='Tags' name='tags' type='text' />
        <TextArea label='Description' name='description' />
      </div>
      <CodeEditor onCodeChange={handleCodeEditorChange} onFileNameChange={handleFileNameChange} snippet={snippet} />

      <ActionBar>
        <Button href={`/${snippet?.id ? snippet.id : ''}`}>Cancel</Button>
        <Button type='submit' color='primary'>
          Save
        </Button>
      </ActionBar>
    </Form>
  );
};

export default SnippetsAdd;
