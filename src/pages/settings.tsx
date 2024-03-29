import { useEffect } from 'react';
import { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

// lib
import { appConfig } from '../lib/config';
import { saveFile } from '../lib/file-management';

// hooks
import useSettings, { Settings } from '../hooks/context/useSettings';

// components
import Layout from '../components/global/Layout';
import Form from '../components/base/Form';
import Select from '../components/base/Select';
import Input from '../components/base/Input';
import ColorPicker from '../components/ColorPicker';
import Button from '../components/base/Button';

type Form = Settings;

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
        <div className='flex max-w-screen-sm flex-col gap-6'>
          <Input type='text' name='defaultFileName' label='Default File Name' />
          <Select label='Default Editor Language' name='defaultEditorLanguage' options={appConfig.LANGUAGES} />

          <ColorPicker label='Interface Accent Color' name='accentColor' activeValue={form.getValues().accentColor} />

          <div>
            <Button type='submit' color='primary'>
              Save Settings
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
};

export default Settings;
