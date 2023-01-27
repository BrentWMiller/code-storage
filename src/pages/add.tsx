import { NextPage } from 'next';

// components
import Layout from '../components/global/Layout';
import SnippetForm from '../components/SnippetForm';

const SnippetsAdd: NextPage = () => {
  return (
    <Layout>
      <SnippetForm />
    </Layout>
  );
};

export default SnippetsAdd;
