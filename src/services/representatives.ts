"use strict";
import { Document } from "mongoose";
import { Representative, VotingRecord } from "../models";
import { fetchChamberMembers, getMemberVotes } from "../utils/apiCalls";
import Logger from "../utils/logger";
const { logger } = Logger;

type query = {
  state?: string;
  district?: string;
};

export const getRepresentatives = async (query: query): Promise<Document[]> =>
  await Representative.find({
    $or: [
      {
        $and: [
          { title: { $regex: /senator/i } },
          {
            state: query?.state,
          },
        ],
      },
      query,
    ],
  });

export const fetchAllMembers = async () => {
  const senators = await fetchChamberMembers("senate");
  const reps = await fetchChamberMembers("house");
  return [...senators, ...reps];
};

export const refreshRepresentatives = async (): Promise<void> => {
  try {
    const members = await fetchAllMembers();
    await Representative.bulkWrite(
      members.map((member) => {
        return {
          updateOne: {
            update: member,
            filter: { id: member.id },
            upsert: true,
          },
        };
      }),
    );
  } catch (err) {
    logger.error(err);
  }
};

export const getMemberVotingRecords = async (
  member_id: string,
): Promise<Document[]> => {
  try {
    const res = await VotingRecord.find({ member_id });
    if (res.length !== 0) return res;
    const response = await getMemberVotes(member_id);
    const records = response[0].votes;

    await VotingRecord.bulkWrite(
      records.map(
        (record: {
          date: string;
          time: string;
          description: string;
          member_id: string;
        }) => {
          return {
            updateOne: {
              update: record,
              filter: {
                date: record.date,
                time: record.time,
                description: record.description,
                member_id: record.member_id,
              },
              upsert: true,
            },
          };
        },
      ),
    );
  } catch (error) {
    logger.error(error);
  } finally {
    return await VotingRecord.find({ member_id });
  }
};
