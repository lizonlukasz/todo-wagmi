import { useState, useEffect } from 'react';
import {
  useAccount, useContractRead,
  useContractWrite, useNetwork, useWaitForTransaction,
} from 'wagmi';
import { todoListContractAbi as abi } from 'abis';

const TODO_CONTRACT_ADDRESS = '0xcc63fc46bd3b5b093448e9be557b563cef68346e'; // New from ChatGPT

export const useTodoListContract = () => {
  const [error, setError] = useState<Error | null>(null);
  const { chain } = useNetwork();
  const { address } = useAccount();

  const {
    data: taskList,
    refetch: refetchTaskList,
    isLoading: taskListLoading,
    isSuccess: taskListSuccess,
  } = useContractRead({
    address: TODO_CONTRACT_ADDRESS,
    abi,
    functionName: 'getTodoList',
    args: [address!],
  });

  const {
    data: createTaskData,
    write: writeCreateTask,
  } = useContractWrite({
    address: TODO_CONTRACT_ADDRESS,
    abi,
    functionName: 'addTask',
    onError: setError,
  });

  const addTask = (text: string) => {
    writeCreateTask({ args: [text] });
  };

  const { isSuccess: createTaskSuccess } = useWaitForTransaction({
    hash: createTaskData?.hash,
  });

  const {
    data: completeTaskData,
    write: writeToggleCompleted,
  } = useContractWrite({
    address: TODO_CONTRACT_ADDRESS,
    abi,
    functionName: 'markTaskCompleted',
    onError: setError,
  });

  const completeTask = (taskId: bigint) => {
    writeToggleCompleted({ args: [taskId] });
  };

  const { isSuccess: completeTaskSuccess, isLoading: completeTaskLoading } = useWaitForTransaction({
    hash: completeTaskData?.hash,
  });

  useEffect(() => {
    refetchTaskList();
  }, [createTaskSuccess, completeTaskSuccess, chain, address]);

  return {
    taskList: taskList ?? [],
    taskListLoading,
    taskListSuccess,
    addTask,
    completeTask,
    completeTaskLoading,
    error,
  };
};
