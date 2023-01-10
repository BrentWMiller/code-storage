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

type Form = {
  test: string;
  defaultEditorLanguage: string;
};

const Settings: NextPage = () => {
  const form = useForm<Form>({
    defaultValues: {
      defaultEditorLanguage: appConfig.DEFAULT_LANGUAGE_ID,
    },
  });

  const handleSubmit: SubmitHandler<Form> = async (data) => {
    try {
      await saveFile('settings.json', JSON.stringify(data));
      toast.success('Settings saved');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save settings');
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const file = await readFile('settings.json');
        const settings = JSON.parse(file);

        if (settings) {
          form.reset(settings);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to load settings');
      }
    };

    loadSettings();
  }, []);

  return (
    <Layout heading='Settings' container>
      <Form form={form} onSubmit={handleSubmit}>
        <Input type='text' name='test' label='Test' />
        <Select label='Default Editor Language' name='defaultEditorLanguage' options={appConfig.LANGUAGES} />
        <button type='submit'>Save Settings</button>
      </Form>
    </Layout>
  );
};

export default Settings;
