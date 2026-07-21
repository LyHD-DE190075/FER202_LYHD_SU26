import './PageHeader.css';

const PageHeader = ({ icon, title }) => {
  return (
    <header className="page-header">
      {icon}
      <h1>{title}</h1>
    </header>
  );
};

export default PageHeader;
