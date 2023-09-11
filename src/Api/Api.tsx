import { GridRowId } from "@mui/x-data-grid";
import { instance } from "../Services/Instace";
import dayjs from "dayjs";
import { Partner } from "../Interfaces/CreatePartner";
import { EditePartnerRequest } from "../Interfaces/EditePartnerRequest";



export async function GetPersonsDataInd(id: string) {  // request for find individual page the partner
  const response = await instance.get(`partner/${id}`)
  return response;
}

export async function GetPersonsData(data: string) {
  const response = await instance.get(`partner?${data}`); //request for find all date the partner
  return response;
}

export async function chahgePersonStatus({ id, status }: { id: GridRowId; status: boolean }) {
  const newStatus = status ? "active" : "deactive";
  const response = await instance.patch(`partner/${id}`, { // status actived or deactived
    status: newStatus
  });
  return response;
}

function formatWithLeadingZero(value: number) {
  return value < 10 ? `0${value} ` : value;
}
export async function createPartner(data: Partner) { // add new partner in thw my data base
  const currentDate = new Date();
  const hours = formatWithLeadingZero(currentDate.getHours());
  const minutes = formatWithLeadingZero(currentDate.getMinutes());
  const formattedCreationDate = `${dayjs(new Date()).format("DD.MM.YYYY")} ${hours}:${minutes} `;
  const response = await instance.post("partner", {
    ...data,
    status: "active",
    creationDate: formattedCreationDate,
  });

  return response;
}

export async function editePartner(data: EditePartnerRequest) {  // editing data of partner
  console.log(data)
  const response = await instance.patch(`partner/${data.id}`, data);
  return response

}
