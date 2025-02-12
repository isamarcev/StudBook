import { FC } from "react";
import Header from "../components/Header";
import Page from "../Page";
import { useNavigate, useParams } from "react-router-dom";
import { useInstructor } from "../hooks/useInstructor";
import { useForm } from "react-hook-form";
import { useTransaction } from "../hooks/useTransactionHook";
import LoadingPopup from "../components/LoadingPopup";
import { useProject } from "../hooks/useProject";

const ApplyPage: FC = () => {
  const { id } = useParams();

  const isInstructor = useInstructor();
  const { register, handleSubmit } = useForm();
  const transactions = useTransaction();
  const navigate = useNavigate();

  const project = useProject(Number(id));

  return (
    <Page>
      <LoadingPopup
        text={"Підтвердіть транзакцію в гаманці"}
        isLoading={transactions.loading}
      ></LoadingPopup>
      <div className="flex flex-col gap-4 text-start">
        <Header isInstructor={isInstructor} />
        <div className="flex flex-col bg-[#141519] p-4 gap-4 rounded-2xl min-w-[350px]">
          <h2>
            ID: <b>{project.project?.projectId}</b>
          </h2>
          <h2>
            Назва проекту: <b>{project.project?.name}</b>
          </h2>
          <h2>
            Опис: <b>{project.project?.description}</b>
          </h2>
          <h2>
            Creator: <b>{project.project?.creator}</b>
          </h2>
          <h2>
            Дедлайн:{" "}
            <b>
              {project.project?.deadline
                ? new Date(
                    Number(project.project.deadline) * 1000
                  ).toLocaleDateString("uk-UA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </b>
          </h2>
          <h2>
            Винагорода: <b>{project.project?.reward}</b>
          </h2>
        </div>
        <h2 className="text-2xl">Подати заявку:</h2>
        <form
          action=""
          className="flex flex-col gap-4 p-2"
          onSubmit={handleSubmit((data) => {
            transactions
              .sendSubmitAchievement(Number(id), data.description)
              .then((_) => {
                navigate("/");
              });
          })}
        >
          <div className="flex flex-col gap-4 p-2">
            <label htmlFor="description">Опис для заяки:</label>
            <textarea
              id="description"
              cols={30}
              rows={5}
              className="bg-[#141519] text-white p-2 rounded-lg outline-none"
              {...register("description")}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#FFFFFF] text-black p-1 rounded-3xl hover:cursor-pointer"
          >
            Подати заявку
          </button>
        </form>
      </div>
    </Page>
  );
};

export default ApplyPage;
