import { useEffect } from 'react';
import { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

// lib
import { appConfig } from '../lib/config';
import { readFile, saveFile } from '../lib/file-management';

// components
import Layout from '../components/global/Layout';
import Form from '../components/base/Form';
import Select from '../components/base/Select';
import Input from '../components/base/Input';
import useSettings from '../hooks/context/useSettings';

type Form = {
  test: string;
  defaultEditorLanguage: string;
};

const Settings: NextPage = () => {
  const { settings, loadSettings } = useSettings();

  const form = useForm<Form>({
    defaultValues: settings,
  });

  const handleSubmit: SubmitHandler<Form> = async (data) => {
    try {
      await saveFile('settings.json', JSON.stringify(data));
      await loadSettings();
      toast.success('Settings saved');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save settings');
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <Layout heading='Settings' container>
      <Form form={form} onSubmit={handleSubmit}>
        <div className='flex flex-col gap-6 max-w-screen-sm'>
          <Input type='text' name='defaultFileName' label='Default file name' />
          <Select label='Default editor language' name='defaultEditorLanguage' options={appConfig.LANGUAGES} />
          <button type='submit'>Save Settings</button>
        </div>
      </Form>
    </Layout>
  );
};

export default Settings;
