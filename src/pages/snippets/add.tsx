import { NextPage } from 'next';

// components
import CodeEditor from '../../components/CodeEditor';
import Layout from '../../components/global/Layout';

const SnippetsAdd: NextPage = () => {
  return (
    <Layout heading='Add Snippet'>
      <CodeEditor />
    </Layout>
  );
};

export default SnippetsAdd;
