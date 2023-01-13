import { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';

// components
import Form from '../../components/base/Form';
import Input from '../../components/base/Input';
import CodeEditor from '../../components/CodeEditor';
import Layout from '../../components/global/Layout';
import ActionBar from '../../components/global/ActionBar';
import Button from '../../components/base/Button';
import TextArea from '../../components/base/Textarea';

type Form = {
  title: string;
  description: string;
  tags: string[];
};

const SnippetsAdd: NextPage = () => {
  const form = useForm<Form>({
    defaultValues: {
      title: '',
      description: '',
      tags: [],
    },
  });

  const handleSubmit: SubmitHandler<Form> = async (data) => {
    console.log(data);
    // try {
    //   await saveFile('settings.json', JSON.stringify(data));
    //   await loadSettings();
    //   toast.success('Settings saved');
    // } catch (error) {
    //   console.error(error);
    //   toast.error('Failed to save settings');
    // }
  };

  return (
    <Layout>
      <Form form={form} onSubmit={handleSubmit} className='flex flex-col gap-8 h-full'>
        <div className='px-8 flex flex-col gap-4 max-w-[500px]'>
          <Input label='Title' name='title' type='text' />
          <TextArea label='Description' name='description' />
        </div>
        <CodeEditor />

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
