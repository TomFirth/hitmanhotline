import prisma from './db';
import { ADMIN_TASK_TEMPLATES, AdminTaskOption } from './adminTaskData';

export const generateRandomTask = async (userId: string) => {
  const template = ADMIN_TASK_TEMPLATES[Math.floor(Math.random() * ADMIN_TASK_TEMPLATES.length)];

  return await prisma.adminTask.create({
    data: {
      userId,
      category: template.category,
      sender: template.sender,
      subject: template.subject,
      content: template.content,
      options: JSON.stringify(template.options)
    }
  });
};

export const resolveTask = async (taskId: string, optionIndex: number) => {
  const task = await prisma.adminTask.findUnique({
    where: { id: taskId },
    include: { user: true }
  });

  if (!task) throw new Error('Task not found');

  const options: AdminTaskOption[] = JSON.parse(task.options);
  const selectedOption = options[optionIndex];

  if (!selectedOption) throw new Error('Invalid option selected');

  const { impact } = selectedOption;

  await prisma.user.update({
    where: { id: task.userId },
    data: {
      balance: { increment: impact.cash || 0 },
      reputation: { increment: impact.reputation || 0 }
    }
  });

  await prisma.adminTask.delete({
    where: { id: taskId }
  });

  return {
    response: selectedOption.label,
    flavourResponse: selectedOption.flavourResponse,
    impact
  };
};

export const startTaskGenerator = () => {
  console.log('CEO Inbox Service Initialised [Mode: Daily Briefing Generator]');

  setInterval(async () => {
    const users = await prisma.user.findMany();
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    for (const user of users) {
      if (user.lastActiveAt < fiveMinutesAgo) {
        continue;
      }

      const taskCount = await prisma.adminTask.count({ where: { userId: user.id } });
      if (taskCount < 3) {
        await generateRandomTask(user.id);
        console.log(`Generated daily briefing task for active user: ${user.username}`);
      }
    }
  }, 43200000);
};
