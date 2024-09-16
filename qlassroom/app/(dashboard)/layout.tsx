const DashboardLayout = ({
    children 
} : {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex py-100">
            {children}
        </div>
    );
}

export default DashboardLayout;