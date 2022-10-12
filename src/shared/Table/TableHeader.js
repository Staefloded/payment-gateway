import { useEffect, useState } from 'react';
import { Input, DatePicker, Tooltip } from 'antd';
import { ExportToXLS } from 'utils';
import { MenuFoldOutlined } from '@ant-design/icons';
import { Popover, Select, Dropdown, Menu } from 'antd';
import { useSelector } from 'react-redux';
import ArrowDown from '../assets/arrowdown.svg';
import Printer from '../assets/printer.svg';
import SearchIcon from '../assets/search-normal.svg';
import Lineicon from '../assets/balline.svg';
import Calender from '../components/Calender';
import useCalender from '../../hooks/useCalender';

const { RangePicker } = DatePicker;

const { Option } = Select;
const { Search } = Input;

function TableHeader({ data, fileName }) {
	const { calender, setCalender } = useCalender();

	const handleExportClick = () => {
		ExportToXLS(data, fileName);
	};

	const menu = (
		<Menu
			items={[
				{
					key: '1',
					label: (
						<>
							<button>Download all</button>
						</>
					),
				},
				{
					key: '2',
					label: (
						<>
							<button onClick={handleExportClick}>Export Recent</button>
						</>
					),
				},
			]}
		/>
	);

	const content = (
		<div className='w-[400px]'>
			<div className='flex-1 flex relative'>
				<img
					src={SearchIcon}
					alt=''
					className='mr-[-20px] absolute top-3 left-[23px]'
				/>
				<input
					type='text'
					placeholder='Search by keyword, name, amount, branch or transaction ID'
					className='w-full h-[49px] rounded-[5px] bg-[#F6F7FB] text-[14px] pl-[51px]'
				/>
			</div>
			<div className='cursor-pointer my-5'>
				<Popover
					content={<Calender calender={calender} setCalender={setCalender} />}
					title=''>
					<div className='w-full h-[48px] flex justify-between items-center bg-[#F6F7FB] rounded-[5px] px-[16px] '>
						<p className='font-prodisplay text-[14px] font-normal text-[#000000]'>
							Date
						</p>
						<img src={ArrowDown} alt='' />
					</div>
				</Popover>
			</div>
			<div className='cursor-pointer'>
				<Dropdown overlay={menu} placement='bottomLeft' arrow>
					<div className='w-full h-[48px] flex justify-between items-center bg-[#F6F7FB] rounded-[5px] px-[16px]'>
						<img src={Printer} alt='' />
						<p className='font-prodisplay text-[16px] font-normal text-[#525261]'>
							Print history
						</p>
					</div>
				</Dropdown>
			</div>
		</div>
	);

	return (
		<div className='bg-white w-full py-[10px] px-[30px] pt-[30px] mb-0 flex space-x-[28px]'>
			<div className='hidden md:flex'>
				<Popover placement='bottomRight' content={content}>
					<Tooltip title='filter'>
						<MenuFoldOutlined style={{ fontSize: '20px' }} />
					</Tooltip>
				</Popover>
			</div>
			<div className='flex-1 flex relative md:hidden'>
				<img
					src={SearchIcon}
					alt=''
					className='mr-[-20px] absolute top-3 left-[23px]'
				/>
				<input
					type='text'
					placeholder='Search by keyword, name, amount, branch or transaction ID'
					className='w-full h-[49px] rounded-[5px] bg-[#F6F7FB] text-[14px] pl-[51px]'
				/>
				<img src={Lineicon} alt='' className='absolute top-3 right-3' />
			</div>
			<div className='cursor-pointer md:hidden'>
				<Popover
					content={<Calender calender={calender} setCalender={setCalender} />}
					title=''>
					<div className='w-[134px] h-[48px] flex justify-between items-center bg-[#F6F7FB] rounded-[5px] px-[16px] '>
						<p className='font-prodisplay text-[14px] font-normal text-[#000000]'>
							Date
						</p>
						<img src={ArrowDown} alt='' />
					</div>
				</Popover>
			</div>
			<div className='cursor-pointer md:hidden'>
				<Dropdown overlay={menu} placement='bottomLeft' arrow>
					<div className='w-[136px] h-[48px] flex justify-between items-center bg-[#F6F7FB] rounded-[5px] px-[16px]'>
						<img src={Printer} alt='' />
						<p className='font-prodisplay text-[16px] font-normal text-[#525261]'>
							Print history
						</p>
					</div>
				</Dropdown>
			</div>
		</div>
	);
}

export default TableHeader;
