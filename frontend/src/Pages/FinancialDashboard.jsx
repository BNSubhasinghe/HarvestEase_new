import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Table, Modal, Menu, Divider, Tag } from 'antd';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  ShoppingOutlined,
  PieChartOutlined,
  FilePdfOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DollarCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';

ChartJS.register(...registerables);

export default function FinancialDashboard() {
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [profitData, setProfitData] = useState({ revenue: 0, expenses: 0 });
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editSale, setEditSale] = useState(null);
  const [view, setView] = useState('sales');

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [salesRes, expensesRes] = await Promise.all([
        fetch('http://localhost:5000/api/sales').then(res => res.json()),
        fetch('http://localhost:5000/api/expenses').then(res => res.json())
      ]);

      setSales(salesRes);
      setExpenses(expensesRes);
      setProfitData({
        revenue: salesRes.reduce((sum, sale) => sum + (sale.quantity * sale.price), 0),
        expenses: expensesRes.reduce((sum, expense) => sum + expense.amount, 0),
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Farm Financial Report', 14, 20);
    
    doc.autoTable({
      head: [['Metric', 'Value']],
      body: [
        ['Total Revenue', `Rs ${profitData.revenue.toLocaleString()}`],
        ['Total Expenses', `Rs ${profitData.expenses.toLocaleString()}`],
        ['Net Profit', `Rs ${(profitData.revenue - profitData.expenses).toLocaleString()}`],
        ['Total Sales', sales.reduce((sum, sale) => sum + sale.quantity, 0)]
      ],
      startY: 30,
      styles: { cellPadding: 5, fontSize: 12 },
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('farm-financial-report.pdf');
  };

  // Handle sale operations
  const handleAddSale = async (values) => {
    setLoading(true);
    try {
      const url = editSale ? `http://localhost:5000/api/sales/${editSale._id}` : 'http://localhost:5000/api/sales';
      const method = editSale ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      setIsModalVisible(false);
      form.resetFields();
      setEditSale(null);
      fetchData();
    } catch (error) {
      console.error('Error saving sale:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSale = (sale) => {
    form.setFieldsValue({
      cropType: sale.cropType,
      quantity: sale.quantity,
      price: sale.price,
      buyerDetails: sale.buyerDetails
    });
    setEditSale(sale);
    setIsModalVisible(true);
  };

  const handleDeleteSale = async (id) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:5000/api/sales/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting sale:', error);
    } finally {
      setLoading(false);
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Crop',
      dataIndex: 'cropType',
      key: 'cropType',
      render: (text) => <Tag color="green">{text}</Tag>
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right'
    },
    {
      title: 'Price (Rs)',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (text) => text.toLocaleString()
    },
    {
      title: 'Total (Rs)',
      key: 'total',
      align: 'right',
      render: (_, record) => (record.quantity * record.price).toLocaleString()
    },
    {
      title: 'Buyer',
      dataIndex: ['buyerDetails', 'name'],
      key: 'buyer'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditSale(record)}
          />
          <Button
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteSale(record._id)}
            danger
          />
        </div>
      )
    }
  ];

  // Chart data
  const salesChartData = {
    labels: sales.map(s => s.cropType || 'Other'),
    datasets: [{
      label: 'Revenue (Rs)',
      data: sales.map(s => s.quantity * s.price),
      backgroundColor: 'rgba(46, 204, 113, 0.7)',
      borderColor: 'rgba(46, 204, 113, 1)',
      borderWidth: 1
    }]
  };

  const expensesChartData = {
    labels: expenses.map(e => e.category || 'Misc'),
    datasets: [{
      data: expenses.map(e => e.amount),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
        '#9966FF', '#FF9F40', '#8AC24A', '#607D8B'
      ]
    }]
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* eBay-style Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Farm Financials</h1>
          <p className="text-sm text-gray-500">Sales & Expense Tracker</p>
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[view]}
          className="flex-1 border-r-0"
        >
          <Menu.Item 
            key="sales" 
            icon={<ShoppingOutlined className="text-lg" />}
            onClick={() => setView('sales')}
            className="text-base font-medium"
          >
            Sales Records
          </Menu.Item>
          <Menu.Item 
            key="graphs" 
            icon={<PieChartOutlined className="text-lg" />}
            onClick={() => setView('graphs')}
            className="text-base font-medium"
          >
            Analytics
          </Menu.Item>
          <Divider className="my-2" />
          
          <Menu.Item 
            key="report" 
            icon={<FilePdfOutlined className="text-lg" />}
            onClick={generatePDF}
            className="text-base font-medium"
          >
            Export Report
          </Menu.Item>
          <Menu.Item 
            key="add" 
            icon={<PlusOutlined className="text-lg" />}
            onClick={() => setIsModalVisible(true)}
            className="text-base font-medium bg-blue-50 text-blue-600"
          >
            New Sale
          </Menu.Item>
        </Menu>

        <div className="p-4 border-t border-gray-200">
          <div className="mb-3">
            <div className="flex items-center text-gray-600 mb-1">
              <DollarCircleOutlined className="mr-2" />
              <span>Revenue</span>
            </div>
            <div className="flex items-center">
              <ArrowUpOutlined className="text-green-500 mr-1" />
              <span className="font-bold">Rs {profitData.revenue.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex items-center text-gray-600 mb-1">
              <DollarCircleOutlined className="mr-2" />
              <span>Expenses</span>
            </div>
            <div className="flex items-center">
              <ArrowDownOutlined className="text-red-500 mr-1" />
              <span className="font-bold">Rs {profitData.expenses.toLocaleString()}</span>
            </div>
          </div>
          
          <div>
            <div className="flex items-center text-gray-600 mb-1">
              <DollarCircleOutlined className="mr-2" />
              <span>Profit</span>
            </div>
            <div className="flex items-center">
              <span className={`mr-1 ${
                profitData.revenue - profitData.expenses >= 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {profitData.revenue - profitData.expenses >= 0 ? '+' : ''}
                {Math.abs(profitData.revenue - profitData.expenses).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {view === 'sales' ? (
          <Card
            title="Sales Transactions"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
              >
                Add Sale
              </Button>
            }
            className="shadow-sm"
          >
            <Table
              columns={columns}
              dataSource={sales}
              rowKey="_id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: true }}
            />
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Revenue by Crop" className="shadow-sm">
              <Bar
                data={salesChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom' }
                  }
                }}
                height={300}
              />
            </Card>
            <Card title="Expense Breakdown" className="shadow-sm">
              <Pie
                data={expensesChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom' }
                  }
                }}
                height={300}
              />
            </Card>
          </div>
        )}
      </div>

      {/* Add/Edit Sale Modal */}
      <Modal
        title={editSale ? 'Edit Sale Record' : 'Add New Sale'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditSale(null);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddSale}
        >
          <Form.Item
            name="cropType"
            label="Crop Type"
            rules={[{ required: true, message: 'Please select crop type' }]}
          >
            <Input placeholder="e.g., Wheat, Rice, Corn" />
          </Form.Item>
          
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: 'Please enter quantity' }]}
            >
              <Input type="number" min={1} placeholder="Qty in kg" />
            </Form.Item>
            
            <Form.Item
              name="price"
              label="Price per Unit (Rs)"
              rules={[{ required: true, message: 'Please enter price' }]}
            >
              <Input type="number" min={1} placeholder="Price in Rs" />
            </Form.Item>
          </div>
          
          <Form.Item
            name={['buyerDetails', 'name']}
            label="Buyer Name"
            rules={[{ required: true, message: 'Please enter buyer name' }]}
          >
            <Input placeholder="Buyer's full name" />
          </Form.Item>
          
          <Form.Item
            name={['buyerDetails', 'contact']}
            label="Buyer Contact"
            rules={[{ required: true, message: 'Please enter contact info' }]}
          >
            <Input placeholder="Phone or email" />
          </Form.Item>
          
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              {editSale ? 'Update Sale' : 'Add Sale'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}