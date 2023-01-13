import { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';

// components
import Form from '../../components/base/Form';
import Input from '../../components/base/Input';
import CodeEditor from '../../components/CodeEditor';
import Layout from '../../components/global/Layout';

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
    <Layout heading='Add a Snippet' description='Name it, describe it, paste some code, and save.'>
      <Form form={form} onSubmit={handleSubmit} className='flex flex-col gap-8'>
        <div className='px-8'>
          <Input label='Title' name='title' type='text' />
          <Input label='Description' name='description' type='text' />
        </div>
        <CodeEditor />
      </Form>
    </Layout>
  );
};

export default SnippetsAdd;
