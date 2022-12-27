import { Request, Response } from "express";
import { Companie } from "../../db/entities";

const getCompanies = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let companies: any;

    if(id) {
      companies = await Companie.findOneBy({id: parseInt(id)});
    } else {
      companies = await Companie.find();
    }

    return res.json(companies);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

const createCompanie = async (req: Request, res: Response) => {
  try {
    const { name, idTypeCompanie, comments, constitutionDate } = req.body;
    const companies = new Companie();

    companies.name = name;
    companies.constitutionDate = constitutionDate;
    companies.idTypeCompanie = idTypeCompanie;
    companies.comments = comments;
    await companies.save();

    return res.json(companies);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

const updateCompanie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let companie: any = await Companie.findOneBy({ id: parseInt(id) });

    if (!companie)
      return res.status(404).json({ message: "Companie does not exists" });

    companie = await Companie.update({id: parseInt(id)}, req.body);

    return res.json(companie);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

const deleteCompanie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const companie = await Companie.delete({ id: parseInt(id) });

    return res.json(companie);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export { getCompanies, createCompanie, updateCompanie, deleteCompanie };
