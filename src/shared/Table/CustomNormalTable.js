import { useEffect } from 'react';
import { Table, Pagination } from 'antd';
import TableHeader from './TableHeader';
import Left from '../assets/arrow-square-left.svg';
import Right from '../assets/arrow-square-right.svg';

function CustomNormalTable({
	columns,
	data,
	fileName,
	total = 10,
	setPageSize,
	pageSize,
	setPage,
	page,
	header,
	pagination,
}) {
	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys}`,
				'selectedRows: ',
				selectedRows
			);
		},
	};

	const itemRender = (_, type, originalElement) => {
		if (type === 'prev') {
			return (
				<div className='mr-[60px]'>
					<div className='flex items-center pr-4'>
						<img src={Left} alt='' className='mr-[8px]' />

						<p className='text-[#303041] font-prodisplay text-[14px] font-normal'>
							Previous
						</p>

						<div className='border-solid border-r-[0.5px] border-r-[#BABABE] h-6 ml-4 '></div>
					</div>
				</div>
			);
		}

		if (type === 'next') {
			return (
				<div className='ml-[50px]'>
					<div className='flex items-center pl-4'>
						<div className='border-solid border-l-[0.5px] border-l-[#BABABE] h-6 mr-4'></div>
						<p className='text-[#303041] font-prodisplay text-[14px] font-normal'>
							Next
						</p>
						<img src={Right} alt='' className='ml-[8px]' />
					</div>
				</div>
			);
		}

		return originalElement;
	};

	// const { table: loading } = useSelector((state) => state.Loader);

	return (
		<div className='w-full'>
			{header && (
				<div className='w-full '>
					<TableHeader data={data} fileName={fileName} />
				</div>
			)}

			<div className='w-full min-width-[1460px] overflow-x-scroll scrollbar-hide'>
				<Table
					// rowSelection={{
					// 	rowSelection,
					// 	onSelect: (record) => {
					// 	  console.log(record);
					// 	},
					// 	onSelectAll: (selected, selectedRows, changeRows) =>
					// 		console.log(selected, selectedRows),

					// 	onSelectMultiple: (selected, selectedRows, changeRows) =>
					// 		console.log({ selectedRows }),
					// }}
					// onRow={(record) => {
					//   return {
					//     onClick: () => console.log(record), // click row
					//     style: {cursor: 'pointer'},
					//   };
					// }}
					rowKey={(record) => record.id}
					// loading={loading}
					columns={columns}
					dataSource={data}
					tableLayout={'auto'}
					pagination={false}
				/>
			</div>
			{pagination && (
				<div className='w-full my-6 flex justify-end items-center text-[black]'>
					<Pagination
						position={['bottomRight']}
						total={total}
						onShowSizeChange={(current, pageSize) => {
							setPageSize(pageSize);
							setPage(current);
						}}
						showQuickJumper
						defaultCurrent={`${page}`}
						defaultPageSize={`${pageSize}`}
						onChange={(page, pageSize) => {
							setPageSize(pageSize);
							setPage(page);
						}}
						itemRender={itemRender}
						// locale={{ jump_to: '', page: `out of ${total / pageSize}` }}
					/>
				</div>
			)}
		</div>
	);
}

export default CustomNormalTable;
