import { NextPage } from 'next';

// components
import CodeEditor from '../../components/CodeEditor';
import Layout from '../../components/global/Layout';

const SnippetsAdd: NextPage = () => {
  return (
    <Layout heading='Add a Snippet' description='Name it, describe it, paste some code, and save.'>
      <CodeEditor />
    </Layout>
  );
};

export default SnippetsAdd;
